import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

import Kalender2027_DE from "@/assets/calendar/Kalender2027_DE_embedded.webp";
import Kalender2027_DE2 from "@/assets/calendar/Kalender2027_DE_embedded2.webp";
import Kalender2027_DE3 from "@/assets/calendar/Kalender2027_DE_embedded3.webp";
import Kalender2027_DE4 from "@/assets/calendar/Kalender2027_DE_embedded4.webp";
import Kalender2027_DE5 from "@/assets/calendar/Kalender2027_DE_embedded5.webp";
import Kalender2027_DE6 from "@/assets/calendar/Kalender2027_DE_embedded6.webp";
import Kalender2027_DE7 from "@/assets/calendar/Kalender2027_DE_embedded7.webp";
import Kalender2027_DE8 from "@/assets/calendar/Kalender2027_DE_embedded8.webp";
import Kalender2027_DE9 from "@/assets/calendar/Kalender2027_DE_embedded9.webp";
import Kalender2027_DE10 from "@/assets/calendar/Kalender2027_DE_embedded10.webp";
import Kalender2027_DE11 from "@/assets/calendar/Kalender2027_DE_embedded11.webp";
import Kalender2027_DE12 from "@/assets/calendar/Kalender2027_DE_embedded12.webp";
import Kalender2027_DE13 from "@/assets/calendar/Kalender2027_DE_embedded13.webp";

const YEAR = 2027;

const MONTHS = [
    "Start", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const PAGES: string[] = [
    Kalender2027_DE, Kalender2027_DE2, Kalender2027_DE3, Kalender2027_DE4,
    Kalender2027_DE5, Kalender2027_DE6, Kalender2027_DE7, Kalender2027_DE8,
    Kalender2027_DE9, Kalender2027_DE10, Kalender2027_DE11, Kalender2027_DE12, Kalender2027_DE13
];

const LAST = PAGES.length - 1;

/* ---------- flip feel ---------- */
const CORNER_ZONE = 0.22;   // hover area around the bottom corners (share of page width)
const MIN_PEEK = 30;        // px – how far the corner lifts as soon as you hover it
const COMPLETE_AT = 0.25;   // release past this share of the flip → page turns
const FLICK_SPEED = 0.5;    // px/ms – a fast flick also turns the page
const FOLLOW_DRAG = 24;     // how tightly the corner follows the pointer (higher = tighter)
const FOLLOW_HOVER = 12;
const FOLLOW_RELEASE = 9;
const AUTO_FLIP_MS = 700;   // buttons & arrow keys
const FLAP_FADE = 4;        // higher = page stays visible longer while going over the top

/* ---------- look ---------- */
const PAPER = "#f3f1ec";    // back side of a page
const FLAP_SHADE =
    "linear-gradient(to right, rgba(0,0,0,0.18), rgba(255,255,255,0.35) 40%, rgba(0,0,0,0.08))";
const CAST_SHADOW = "linear-gradient(to right, rgba(0,0,0,0.35), rgba(0,0,0,0))";
const HIDDEN = "polygon(0 0, 0 0, 0 0)";

/* ---------- zoom ---------- */
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 1.5;
const DOUBLE_TAP_ZOOM = 2.5;
const DOUBLE_TAP_MS = 300;

type Slot = "prev" | "current" | "next";
type Mode = "next" | "prev" | "bounce";
type Els = Record<Slot | "flap" | "flapPaper" | "flapShade" | "cast", HTMLDivElement | null>;

interface Point {
    x: number;
    y: number;
}

interface View {
    scale: number;
    x: number;
    y: number;
}

interface Flip {
    mode: Mode | null;
    cornerX: number;                      // x of the grabbed bottom corner (0 or page width)
    cur: Point;                           // where that corner is drawn right now
    target: Point;                        // where it is heading
    speed: number;
    path: ((t: number) => Point) | null;  // scripted path for button / key flips
    pathStart: number;
    hovering: boolean;
    dragging: boolean;
    locked: boolean;                      // finishing a flip – ignore input
    onSettle: (() => void) | null;
}

interface Drag {
    start: Point;
    from: Point;
    last: Point & { t: number };
    vy: number;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const limit = (p: Point, c: Point, r: number): Point => {
    const dx = p.x - c.x;
    const dy = p.y - c.y;
    const d = Math.hypot(dx, dy);
    return d > r ? { x: c.x + (dx * r) / d, y: c.y + (dy * r) / d } : p;
};

// The page hangs from its top edge: the corner can't be pulled further than the paper allows
const constrain = (p: Point, cornerX: number, w: number, h: number): Point => {
    let q = { x: clamp(p.x, 0, w), y: p.y };
    q = limit(q, { x: cornerX, y: 0 }, h);
    return limit(q, { x: w - cornerX, y: 0 }, Math.hypot(w, h));
};

// Part of the page rectangle on one side of the fold line (side 1 = the lifted side)
const clipRect = (w: number, h: number, q: Point, n: Point, side: 1 | -1): Point[] => {
    const corners = [{ x: 0, y: 0 }, { x: w, y: 0 }, { x: w, y: h }, { x: 0, y: h }];
    const dist = (p: Point) => ((p.x - q.x) * n.x + (p.y - q.y) * n.y) * side;
    const out: Point[] = [];
    corners.forEach((a, i) => {
        const b = corners[(i + 1) % 4];
        const da = dist(a);
        const db = dist(b);
        if (da >= 0) out.push(a);
        if ((da >= 0) !== (db >= 0)) {
            const t = da / (da - db);
            out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
        }
    });
    return out;
};

const toClip = (pts: Point[]) =>
    pts.length < 3 ? HIDDEN : `polygon(${pts.map((p) => `${p.x}px ${p.y}px`).join(", ")})`;

function Calendar() {
    const [page, setPage] = useState(0);
    const [zoom, setZoom] = useState(1);
    const pageRef = useRef(0);
    const stageRef = useRef<HTMLDivElement>(null);
    const zoomRef = useRef<HTMLDivElement>(null);

    const els = useRef<Els>({
        prev: null, current: null, next: null,
        flap: null, flapPaper: null, flapShade: null, cast: null,
    });

    const flip = useRef<Flip>({
        mode: null, cornerX: 0, cur: { x: 0, y: 0 }, target: { x: 0, y: 0 }, speed: FOLLOW_HOVER,
        path: null, pathStart: 0, hovering: false, dragging: false, locked: false, onSettle: null,
    });
    const drag = useRef<Drag | null>(null);
    const frame = useRef<number | null>(null);
    const lastTime = useRef(0);

    // Zoom / pan state
    const view = useRef<View>({ scale: 1, x: 0, y: 0 });
    const pointers = useRef(new Map<number, Point>());
    const pan = useRef<Point | null>(null);
    const pinch = useRef<{ dist: number; mid: Point } | null>(null);
    const tap = useRef<(Point & { moved: boolean }) | null>(null);
    const lastTap = useRef<(Point & { t: number }) | null>(null);

    const size = () => ({ w: stageRef.current?.offsetWidth ?? 0, h: stageRef.current?.offsetHeight ?? 0 });

    const stageRect = () => {
        const r = stageRef.current?.getBoundingClientRect();
        return { left: r?.left ?? 0, top: r?.top ?? 0, w: r?.width ?? 0, h: r?.height ?? 0 };
    };

    const local = (clientX: number, clientY: number): Point => {
        const { left, top } = stageRect();
        return { x: clientX - left, y: clientY - top };
    };

    /* ---------- drawing the fold (straight to the DOM, no re-render) ---------- */

    const draw = () => {
        const f = flip.current;
        const e = els.current;
        const { w, h } = size();
        const c = { x: f.cornerX, y: h };
        const p = f.cur;
        const d = Math.hypot(c.x - p.x, c.y - p.y);

        if (!f.mode || d < 0.5) {
            if (e.current) e.current.style.clipPath = "";
            // A previous page that has just landed flat must stay visible until React swaps the pages
            if (e.prev) e.prev.style.clipPath = f.mode === "prev" ? "" : HIDDEN;
            if (e.flap) e.flap.style.visibility = "hidden";
            if (e.cast) e.cast.style.visibility = "hidden";
            return;
        }

        // Fold line = perpendicular bisector between the corner's flat and lifted position
        const n = { x: (c.x - p.x) / d, y: (c.y - p.y) / d };   // points into the lifted part
        const q = { x: (c.x + p.x) / 2, y: (c.y + p.y) / 2 };   // a point on the fold
        const reach = Math.hypot(w, h);
        const alongFold = `translate(${q.x}px, ${q.y}px) rotate(${Math.atan2(n.y, n.x)}rad) translate(0, ${-reach}px)`;
        const progress = clamp(d / (2 * h), 0, 1);
        const strength = clamp(Math.min(progress * 12, (1 - progress) * 5), 0, 1);

        // Flat part of the turning page
        const turning = f.mode === "prev" ? e.prev : e.current;
        const other = f.mode === "prev" ? e.current : e.prev;
        if (turning) turning.style.clipPath = toClip(clipRect(w, h, q, n, -1));
        if (other) other.style.clipPath = f.mode === "prev" ? "" : HIDDEN;

        // Lifted part, mirrored across the fold line – shows the back of the paper
        if (e.flap && e.flapPaper && e.flapShade) {
            const k = 2 * (q.x * n.x + q.y * n.y);
            const m = -2 * n.x * n.y;
            e.flap.style.visibility = "visible";
            // Fade out at the end, as the page disappears over the top
            e.flap.style.opacity = String(clamp((1 - progress) * FLAP_FADE, 0, 1));
            e.flap.style.transform =
                `matrix(${1 - 2 * n.x * n.x}, ${m}, ${m}, ${1 - 2 * n.y * n.y}, ${k * n.x}, ${k * n.y})`;
            e.flapPaper.style.clipPath = toClip(clipRect(w, h, q, n, 1));
            e.flapShade.style.transform = alongFold;
            e.flapShade.style.width = `${d / 2}px`;
            e.flapShade.style.height = `${2 * reach}px`;
        }

        // Shadow on the page underneath, right along the fold
        if (e.cast) {
            e.cast.style.visibility = "visible";
            e.cast.style.transform = alongFold;
            e.cast.style.width = `${Math.min(d * 0.4, 120)}px`;
            e.cast.style.height = `${2 * reach}px`;
            e.cast.style.opacity = String(strength);
        }
    };

    /* ---------- animation loop: the corner eases toward its target ---------- */

    const tick = (now: number) => {
        const f = flip.current;
        const dt = Math.min(50, now - lastTime.current);
        lastTime.current = now;
        let done = false;

        if (f.path) {
            const t = clamp((now - f.pathStart) / AUTO_FLIP_MS, 0, 1);
            f.cur = f.target = f.path(easeInOut(t));
            done = t >= 1;
        } else {
            const a = 1 - Math.exp((-f.speed * dt) / 1000);
            f.cur = { x: f.cur.x + (f.target.x - f.cur.x) * a, y: f.cur.y + (f.target.y - f.cur.y) * a };
            if (!f.dragging && Math.hypot(f.target.x - f.cur.x, f.target.y - f.cur.y) < 0.5) {
                f.cur = { ...f.target };
                done = true;
            }
        }

        draw();

        if (!done) {
            frame.current = requestAnimationFrame(tick);
            return;
        }
        frame.current = null;
        const onSettle = f.onSettle;
        Object.assign(f, { path: null, onSettle: null, locked: false });
        onSettle?.();
    };

    const run = () => {
        if (frame.current !== null) return;
        lastTime.current = performance.now();
        frame.current = requestAnimationFrame(tick);
    };

    const backToRest = () => {
        flip.current.mode = null;
        draw();
    };

    // Let go: ease the corner to `target`, then run `onSettle`
    const finish = (target: Point, onSettle: () => void) => {
        Object.assign(flip.current, {
            dragging: false, hovering: false, locked: true,
            speed: FOLLOW_RELEASE, target, onSettle,
        });
        run();
    };

    // Buttons / keys: the corner travels on a curve, so the page curls diagonally
    const autoFlip = (mode: "next" | "prev", cornerX: number, from: Point, to: Point, onDone: () => void) => {
        const { w, h } = size();
        const bulge = (cornerX === 0 ? 1 : -1) * w * 0.45;
        Object.assign(flip.current, {
            mode, cornerX, hovering: false, dragging: false, locked: true, onSettle: onDone,
            pathStart: performance.now(),
            path: (t: number) =>
                constrain(
                    { x: from.x + (to.x - from.x) * t + Math.sin(Math.PI * t) * bulge, y: from.y + (to.y - from.y) * t },
                    cornerX, w, h,
                ),
        });
        run();
    };

    /* ---------- zoom helpers ---------- */

    const setView = (scale: number, x: number, y: number, smooth = false) => {
        const { w, h } = stageRect();
        const s = clamp(scale, MIN_ZOOM, MAX_ZOOM);
        view.current = { scale: s, x: clamp(x, w * (1 - s), 0), y: clamp(y, h * (1 - s), 0) };

        const el = zoomRef.current;
        if (el) {
            el.style.transition = smooth ? "transform 200ms ease-out" : "none";
            el.style.transform = `translate(${view.current.x}px, ${view.current.y}px) scale(${s})`;
        }

        // Clip only while zoomed – flips need to swing out over the top edge
        const stage = stageRef.current;
        if (stage) {
            if (s > 1) {
                stage.style.overflow = "hidden";
            } else if (smooth) {
                setTimeout(() => {
                    if (view.current.scale === 1) stage.style.overflow = "";
                }, 200);
            } else {
                stage.style.overflow = "";
            }
        }
        setZoom(s);
    };

    const zoomAt = (scale: number, px: number, py: number, smooth = false) => {
        const v = view.current;
        const s = clamp(scale, MIN_ZOOM, MAX_ZOOM);
        const cx = (px - v.x) / v.scale;
        const cy = (py - v.y) / v.scale;
        setView(s, px - cx * s, py - cy * s, smooth);
    };

    const zoomCenter = (scale: number) => {
        const { w, h } = stageRect();
        zoomAt(scale, w / 2, h / 2, true);
    };

    const resetZoom = () => setView(1, 0, 0, true);

    /* ---------- page change ---------- */

    useLayoutEffect(() => {
        pageRef.current = page;
        Object.assign(flip.current, { mode: null, hovering: false });
        draw();
    }, [draw, page]);

    // Preload all images so flips never show an empty page
    useEffect(() => {
        PAGES.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
        return () => {
            if (frame.current !== null) cancelAnimationFrame(frame.current);
        };
    }, []);

    const goNext = useCallback(() => {
        const f = flip.current;
        if (f.locked || f.dragging || pageRef.current >= LAST) return;
        if (view.current.scale > 1) setView(1, 0, 0);
        const { w, h } = size();
        const cornerX = f.mode === "next" ? f.cornerX : w;
        const from = f.mode === "next" ? f.cur : { x: cornerX, y: h };
        autoFlip("next", cornerX, from, { x: cornerX, y: -h }, () => setPage((p) => p + 1));
    }, [autoFlip, setView]);

    const goPrev = useCallback(() => {
        const f = flip.current;
        if (f.locked || f.dragging || pageRef.current <= 0) return;
        if (view.current.scale > 1) setView(1, 0, 0);
        const { w, h } = size();
        autoFlip("prev", w, { x: w, y: -h }, { x: w, y: h }, () => setPage((p) => p - 1));
    }, [autoFlip, setView]);

    /* ---------- hover: lift the corner a bit ---------- */

    const unhover = () => {
        const f = flip.current;
        if (!f.hovering) return;
        f.hovering = false;
        f.target = { x: f.cornerX, y: size().h };
        f.onSettle = backToRest;
        run();
    };

    const hover = (pt: Point) => {
        const f = flip.current;
        if (f.locked || f.dragging || drag.current || view.current.scale > 1 || pageRef.current >= LAST) return;
        if (f.mode && f.mode !== "next") return;

        const { w, h } = size();
        const cornerX = pt.x < w / 2 ? 0 : w;
        const dist = Math.hypot(pt.x - cornerX, pt.y - h);
        if (dist > w * CORNER_ZONE || (f.mode === "next" && f.cornerX !== cornerX)) {
            unhover();
            return;
        }

        if (!f.mode) {
            f.mode = "next";
            f.cornerX = cornerX;
            f.cur = { x: cornerX, y: h };
        }
        // Lift the corner at least a little, even right at the edge
        const dir = cornerX === 0 ? 1 : -1;
        const target =
            dist < MIN_PEEK ? { x: cornerX + dir * MIN_PEEK * Math.SQRT1_2, y: h - MIN_PEEK * Math.SQRT1_2 } : pt;

        Object.assign(f, { hovering: true, speed: FOLLOW_HOVER, onSettle: null, target: constrain(target, cornerX, w, h) });
        run();
    };

    /* ---------- drag ---------- */

    const beginDrag = (d: Drag, dy: number) => {
        const f = flip.current;
        const { w, h } = size();
        const cornerX = d.start.x < w / 2 ? 0 : w;

        if (dy < 0) {
            if (f.mode !== "next") {
                f.cornerX = cornerX;
                f.cur = { x: cornerX, y: h };
            }
            f.mode = pageRef.current < LAST ? "next" : "bounce";
        } else if (pageRef.current > 0) {
            f.mode = "prev";
            f.cornerX = cornerX;
            f.cur = { x: cornerX, y: -h };
        } else {
            return false;
        }

        d.from = { ...f.cur };
        Object.assign(f, { target: { ...f.cur }, dragging: true, hovering: false, speed: FOLLOW_DRAG, onSettle: null });
        return true;
    };

    const release = (time: number) => {
        const d = drag.current;
        drag.current = null;
        const f = flip.current;
        if (!d || !f.dragging) return;

        const { h } = size();
        const vy = time - d.last.t > 100 ? 0 : d.vy; // pointer stood still → no flick
        const up = { x: f.cornerX, y: -h };
        const down = { x: f.cornerX, y: h };
        const p = f.target;

        if (f.mode === "next") {
            const done = ((h - p.y) / (2 * h) > COMPLETE_AT && vy < FLICK_SPEED) || vy < -FLICK_SPEED;
            finish(done ? up : down, done ? () => setPage((n) => n + 1) : backToRest);
        } else if (f.mode === "prev") {
            const done = ((p.y + h) / (2 * h) > COMPLETE_AT && vy > -FLICK_SPEED) || vy > FLICK_SPEED;
            finish(done ? down : up, done ? () => setPage((n) => n - 1) : backToRest);
        } else {
            finish(down, backToRest);
        }
    };

    // A second finger cancels a drag that just started
    const cancelDrag = () => {
        drag.current = null;
        const f = flip.current;
        if (!f.dragging) return;
        const { h } = size();
        finish({ x: f.cornerX, y: f.mode === "prev" ? -h : h }, backToRest);
    };

    /* ---------- pointer: hover, flip, pan, pinch, double-tap ---------- */

    const handleTap = (x: number, y: number) => {
        const now = performance.now();
        const last = lastTap.current;
        if (last && now - last.t < DOUBLE_TAP_MS && Math.hypot(x - last.x, y - last.y) < 30) {
            lastTap.current = null;
            if (view.current.scale > 1) {
                resetZoom();
            } else {
                const { left, top } = stageRect();
                zoomAt(DOUBLE_TAP_ZOOM, x - left, y - top, true);
            }
        } else {
            lastTap.current = { x, y, t: now };
        }
    };

    const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (flip.current.locked || e.button !== 0) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

        // Two fingers → pinch zoom
        if (pointers.current.size === 2) {
            cancelDrag();
            pan.current = null;
            tap.current = null;
            const [a, b] = [...pointers.current.values()];
            pinch.current = {
                dist: Math.hypot(a.x - b.x, a.y - b.y),
                mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
            };
            return;
        }
        if (pointers.current.size > 2) return;

        tap.current = { x: e.clientX, y: e.clientY, moved: false };

        // Zoomed in → drag pans the page
        if (view.current.scale > 1) {
            pan.current = { x: e.clientX, y: e.clientY };
            return;
        }

        const pt = local(e.clientX, e.clientY);
        const f = flip.current;
        drag.current = { start: pt, from: { ...f.cur }, last: { ...pt, t: e.timeStamp }, vy: 0 };

        // Corner is already lifted from hovering → grab it right away
        if (f.mode === "next" && f.hovering) {
            Object.assign(f, { hovering: false, dragging: true, speed: FOLLOW_DRAG, onSettle: null });
        }
    };

    const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        // Mouse moving without a button → corner peek
        if (!pointers.current.has(e.pointerId)) {
            if (e.pointerType === "mouse" && e.buttons === 0 && pointers.current.size === 0) {
                hover(local(e.clientX, e.clientY));
            }
            return;
        }

        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        const t = tap.current;
        if (t && Math.hypot(e.clientX - t.x, e.clientY - t.y) > 6) t.moved = true;

        // Pinch: zoom around the fingers and follow their midpoint
        if (pinch.current && pointers.current.size >= 2) {
            const [a, b] = [...pointers.current.values()];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
            const p = pinch.current;
            const v = view.current;
            const { left, top } = stageRect();
            const s = clamp(v.scale * (dist / p.dist), MIN_ZOOM, MAX_ZOOM);
            const cx = (p.mid.x - left - v.x) / v.scale;
            const cy = (p.mid.y - top - v.y) / v.scale;
            setView(s, mid.x - left - cx * s, mid.y - top - cy * s);
            pinch.current = { dist, mid };
            return;
        }

        // Pan while zoomed
        if (pan.current) {
            const v = view.current;
            setView(v.scale, v.x + e.clientX - pan.current.x, v.y + e.clientY - pan.current.y);
            pan.current = { x: e.clientX, y: e.clientY };
            return;
        }

        // Flip
        const d = drag.current;
        if (!d) return;
        const f = flip.current;
        const pt = local(e.clientX, e.clientY);
        const dx = pt.x - d.start.x;
        const dy = pt.y - d.start.y;

        if (!f.dragging) {
            if (Math.hypot(dx, dy) < 6) return;
            if (!beginDrag(d, dy)) {
                drag.current = null;
                return;
            }
        }

        const dt = e.timeStamp - d.last.t;
        if (dt > 0) d.vy = (pt.y - d.last.y) / dt;
        d.last = { ...pt, t: e.timeStamp };

        const { w, h } = size();
        let target: Point;
        if (f.mode === "prev") {
            // Previous page comes down from the top – its fold edge follows the pointer
            target = { x: d.from.x + dx * 2, y: d.from.y + dy * 2 };
        } else if (f.mode === "bounce") {
            // Last page: lifts only a little, then springs back
            target = limit({ x: d.from.x + dx * 0.3, y: d.from.y + dy * 0.3 }, { x: f.cornerX, y: h }, h * 0.12);
        } else {
            // Corner stays under the pointer
            target = { x: d.from.x + dx, y: d.from.y + dy };
        }
        f.target = constrain(target, f.cornerX, w, h);
        run();
    };

    const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (!pointers.current.delete(e.pointerId)) return;

        // End of pinch: keep panning with the finger that is still down
        if (pinch.current) {
            if (pointers.current.size < 2) {
                pinch.current = null;
                const [rest] = [...pointers.current.values()];
                pan.current = rest && view.current.scale > 1 ? { ...rest } : null;
            }
            return;
        }

        pan.current = null;
        release(e.timeStamp);

        const t = tap.current;
        tap.current = null;
        if (t && !t.moved && e.type === "pointerup") handleTap(e.clientX, e.clientY);
    };

    /* ---------- wheel: Ctrl/⌘ + scroll or trackpad pinch zooms, scroll pans ---------- */

    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;

        const onWheel = (e: WheelEvent) => {
            if (flip.current.locked || flip.current.dragging) return;
            const r = stage.getBoundingClientRect();

            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                unhover();
                zoomAt(view.current.scale * Math.exp(-e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top);
            } else if (view.current.scale > 1) {
                e.preventDefault();
                const v = view.current;
                setView(v.scale, v.x - e.deltaX, v.y - e.deltaY);
            }
        };

        const onResize = () => {
            setView(1, 0, 0);
            draw();
        };

        stage.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("resize", onResize);
        return () => {
            stage.removeEventListener("wheel", onWheel);
            window.removeEventListener("resize", onResize);
        };
    }, [draw, setView, unhover, zoomAt]);

    /* ---------- keyboard ---------- */

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown" || e.key === "ArrowRight") goNext();
            if (e.key === "ArrowUp" || e.key === "ArrowLeft") goPrev();
            if (e.key === "+" || e.key === "=") zoomCenter(view.current.scale * ZOOM_STEP);
            if (e.key === "-") zoomCenter(view.current.scale / ZOOM_STEP);
            if (e.key === "0") resetZoom();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [goNext, goPrev, resetZoom, zoomCenter]);

    /* ---------- render ---------- */

    const renderLayer = (slot: Slot, index: number, zIndex: number) => {
        const src = PAGES[index];
        if (!src) return null;

        return (
            <div
                key={index}
                ref={(el) => {
                    els.current[slot] = el;
                }}
                className="absolute inset-0"
                style={{ zIndex }}
            >
                <img
                    src={src}
                    alt={`${MONTHS[index]} ${YEAR}`}
                    draggable={false}
                    className="block h-full w-full select-none object-cover"
                />
            </div>
        );
    };

    const navButton =
        "h-11 w-11 cursor-pointer rounded-full border border-neutral-300 bg-white text-lg transition hover:bg-neutral-100 disabled:cursor-default disabled:opacity-30 disabled:hover:bg-white";

    return (
        <section className="flex flex-col items-center gap-6 px-4 py-10 font-sans text-neutral-800">

            {/* Zoom controls */}
            <div className="flex items-center justify-end w-[min(80vw,calc(82dvh*0.7071))] gap-1 -mb-4" aria-label="Zoom">
                <button
                    type="button"
                    onClick={() => zoomCenter(view.current.scale / ZOOM_STEP)}
                    disabled={zoom <= MIN_ZOOM}
                    aria-label="Verkleinern"
                    className="cursor-pointer disabled:cursor-default text-neutral-500"
                >
                    −
                </button>
                <button
                    type="button"
                    onClick={resetZoom}
                    disabled={zoom <= MIN_ZOOM}
                    aria-label="Zoom zurücksetzen"
                    className="min-w-14 cursor-pointer text-xs tabular-nums text-neutral-500 disabled:cursor-default pl-2"
                >
                    {Math.round(zoom * 100)}%
                </button>
                <button
                    type="button"
                    onClick={() => zoomCenter(view.current.scale * ZOOM_STEP)}
                    disabled={zoom >= MAX_ZOOM}
                    aria-label="Vergrößern"
                    className="cursor-pointer disabled:cursor-default text-neutral-500"
                >
                    +
                </button>
            </div>

            {/* Stage: one A3 page (297 × 420) */}
            <div
                ref={stageRef}
                role="region"
                aria-label={`Kalender ${YEAR}`}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onPointerLeave={() => {
                    if (pointers.current.size === 0) unhover();
                }}
                className={`relative z-10 aspect-[297/420] w-[min(80vw,calc(82dvh*0.7071))] touch-none select-none bg-neutral-200 shadow-[0_25px_60px_rgba(0,0,0,0.25)] ${
                    zoom > 1 ? "cursor-move" : "cursor-grab active:cursor-grabbing"
                }`}
            >
                {/* Zoom layer: scaled + panned */}
                <div ref={zoomRef} className="absolute inset-0 origin-top-left">
                    {renderLayer("next", page + 1, 1)}
                    {renderLayer("current", page, 2)}
                    {renderLayer("prev", page - 1, 3)}

                    {/* Shadow the lifted page throws onto the page underneath (stays inside the frame) */}
                    <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden">
                        <div
                            ref={(el) => {
                                els.current.cast = el;
                            }}
                            className="invisible absolute left-0 top-0 origin-top-left"
                            style={{ background: CAST_SHADOW }}
                        />
                    </div>

                    {/* Lifted part of the page, mirrored over the fold – can swing out over the top */}
                    <div
                        ref={(el) => {
                            els.current.flap = el;
                        }}
                        className="pointer-events-none invisible absolute inset-0 z-[5] origin-top-left"
                        style={{ filter: "drop-shadow(0 0 6px rgba(0,0,0,0.3))" }}
                    >
                        <div
                            ref={(el) => {
                                els.current.flapPaper = el;
                            }}
                            className="absolute inset-0 overflow-hidden"
                            style={{ background: PAPER }}
                        >
                            <div
                                ref={(el) => {
                                    els.current.flapShade = el;
                                }}
                                className="absolute left-0 top-0 origin-top-left"
                                style={{ background: FLAP_SHADE }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap items-center justify-center gap-5" aria-label="Kalender-Navigation">
                <div className="flex items-center gap-5">
                    <button type="button" onClick={goPrev} disabled={page === 0} aria-label="Vorheriger Monat" className={navButton}>
                        ←
                    </button>
                    <span className="flex min-w-36 flex-col items-center tracking-wide" aria-live="polite">
                        {MONTHS[page]} {YEAR}
                        <small className="text-[0.7rem] text-neutral-400">
                            {page + 1} / {PAGES.length}
                        </small>
                    </span>
                    <button type="button" onClick={goNext} disabled={page === LAST} aria-label="Nächster Monat" className={navButton}>
                        →
                    </button>
                </div>
            </nav>
        </section>
    );
}

export default Calendar;