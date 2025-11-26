export const Logo = () => {
    return (
        <>
            <img
                src="/logo-pizza.png"
                alt=""
            />
            <div>
                <div className={"text-2xl leading-[1.625rem] font-black tracking-[1%]"}>
                    NEXT PIZZA
                </div>
                <div className={"leading-5 text-logo-text"}>вкусней уже некуда</div>
            </div>
        </>
    )
}

Logo.displayName = "Logo";