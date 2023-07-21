'use client'

import {formatString} from "typescript-string-operations"
import {useTelegram} from "../components/TelegramProvider";
import {useCallback, useEffect, useState} from "react";
const REDIRECT_URL = 'https://link.payway.com.kh/aba?id=023B77F5FEB6&code=833005&acc=106081999&amount={0}&dynamic=true'
const Page = () => {

    const [amount, setAmount] = useState<number>(0)
    const telegram = useTelegram()

    const handleMainButtonClick = useCallback(() => {
        // telegram.sendData(JSON.stringify({ counter }))
        // telegram.showAlert(`You clicked ${counter} times!`)
        const url = formatString(REDIRECT_URL, amount)
        telegram.openLink(url)
    }, [amount, telegram])

    useEffect(() => {
        telegram.MainButton.setParams({
            text: 'Pay me',
            is_active: true,
            is_visible: true
        })
    }, [])

    useEffect(() => {
        telegram.onEvent('mainButtonClicked', handleMainButtonClick)
        return () => telegram.offEvent('mainButtonClicked', handleMainButtonClick)
    }, [handleMainButtonClick])


    const data = [
        {
            id: 1,
            price: 2.5,
            name: "bay cha"
        },
        {
            id: 2,
            price: 2.1,
            name: "bok morn"
        }
    ]
    return (
        <div>
            <div className={"d-flex"}>

                {
                    data?.map((item, index) => (
                        <div className={"w-100 card p-3"} key={item.id}>
                            <span>{item.name}</span>
                            <span>{item.price}</span>
                            <button className={"btn btn-sm btn-primary"} onClick={() => setAmount( amount + item.price)}>
                                Buy
                            </button>
                        </div>

                    ))
                }
            </div>

            <div>
                <h3>Total: {amount}</h3>
                <button onClick={() => setAmount(0)} className={"btn btn-sm btn-secondary"}>Clear</button>
            </div>
        </div>
    );
};

export default Page;