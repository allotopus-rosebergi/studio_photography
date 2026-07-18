import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import {collections} from "@/constants/photography"
import type {Collection} from "@/types";
import CustomButton from "@/components/CustomButton.tsx";


function CollectionCarousel() {
    return(
        <div>
            <h2>Collections.</h2>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent className="py-6">
                    {collections.map((collection : Collection) => (
                        <CarouselItem key={collection.id} className="basis-1/2 lg:basis-1/3">
                            <div>
                                <Card style={{ backgroundImage: `url(${collection.thumbnail})` }}
                                      className="bg-cover bg-center p-0">
                                    <CardContent className="aspect-square text-light bg-gradient-to-t from-black">
                                        <div className="flex flex-col items-end h-full justify-around  px-1 py-4">
                                            <CustomButton addon="plus" size="small">NEW PHOTOS ADDED RECENTLY</CustomButton>
                                            <div className="flex flex-col h-full items-start justify-end">
                                                <p className="besley-bold text-xl pb-2">{collection.name}</p>
                                                <p className="pb-4">{collection.description}</p>
                                                <CustomButton addon="arrow" size="small">Visit Collection.</CustomButton>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="w-full flex flex-row justify-center gap-12">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </Carousel>
        </div>
    );
}

export default CollectionCarousel;