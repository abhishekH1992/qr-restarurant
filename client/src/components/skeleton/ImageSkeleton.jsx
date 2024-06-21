import { Skeleton } from "@nextui-org/react";
const ImageSkeleton = ({cssClasses, iterations}) => {
    return(
        [...Array(iterations)].map((i, key) =>
            <Skeleton className="rounded-lg" key={key}>
                <div className={cssClasses}></div>
            </Skeleton>
        )
    )
}

export default ImageSkeleton;