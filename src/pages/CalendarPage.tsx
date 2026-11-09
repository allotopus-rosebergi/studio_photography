import {Calendar} from "@/components"

function CalendarPage(){
   return(
       <section className="gap-4 flex flex-col">
           <div className="flex flex-col w-full p-6 pt-18 md:pt-24 text-center items-center">
               <h1 className="text-4xl md:text-5xl">
                   CALENDAR 2027
               </h1>

               <p className=" mt-3 text-sm md:text-xl">
                   I am excited to introduce my very first photography calendar!
               </p>

               <p className="mt-3 max-w-xl text-sm leading-relaxed opacity-70">
                   It features animal photographs I took during my recent trips to Sweden, London and Austria. The photographs are carefully paired with colorful calendar fields and typography integrated directly into the scenes themselves.
               </p>
           </div>
           <Calendar/>
       </section>

   )
}

export default CalendarPage;