import {Button, Spinner} from "@nextui-org/react";
const AddToCartBtn = ({classNames, radius, btnText, loading, pressFunction}) => {
    return (
        <>
            <Button className={classNames} radius={radius} onPress={pressFunction} disabled={loading ? true : false}>
                {loading ? <Spinner /> : btnText}
            </Button>
        </>
    );
}

export default AddToCartBtn;