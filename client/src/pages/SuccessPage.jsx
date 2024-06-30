import { Card, Button, Link } from "@nextui-org/react"

// TODO DESIGN
const successPage = () => {
    return(
        <>
            <div className="max-w-940 px-spacing-sm md:px-spacing-md lg:px-spacing-lg mx-auto">
                <Card className="max-w-940 grid grid-cols-1 mt-10 gap-5 px-2 py-5">
                    <div className="text-gray-400 flex justify-center items-center h-80-vh flex-col">
                        <div className="text-gray-400 text-sm mb-3">Thank you! 🎉. Your order has been placed.</div>
                        <Button href="/" className="bg-black text-white py-2 px-4 rounded-lg z-50 min-w-eighty-percent md:min-w-20" radius="lg" as={Link} showAnchorIcon>
                            Browse Menu
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default successPage;