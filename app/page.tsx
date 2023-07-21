'use client'

import {useTelegram} from "../components/TelegramProvider";
import {useCallback, useEffect, useState} from "react";

const Page = () => {
    const [counter, setCounter] = useState<number>(0)
    const telegram = useTelegram()

    const handleMainButtonClick = useCallback(() => {
        // telegram.sendData(JSON.stringify({ counter }))
        telegram.showAlert(`You clicked ${counter} times!`)
        // telegram.openLink('https://pay.ababank.com/sZd3YizQDATmqSGm6')
    }, [counter])

    useEffect(() => {
        telegram.MainButton.setParams({
            text: 'Pay',
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
            <h2>Hello word2</h2>

            {
                data?.map((item, index) => (
                    <div key={item.id}>
                        <span>{item.name}</span>
                        <span>{item.price}</span>
                    </div>
                ))
            }

            <button onClick={() => setCounter( counter + 1)}>
                Click me please
            </button>
        </div>
    );
};

export default Page;