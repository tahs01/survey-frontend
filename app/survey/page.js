'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable'
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export default function Page() {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [occupation, setOccupation] = useState('');
    const [suveryData, setSurveyData] = useState([]);

    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    console.log(backendURL)

    const getData = async () => {
        fetch(backendURL)
            .then((data) => data.json())
            .then((data) => {
                setSurveyData(data.data);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { "name": name, "age": age, "occupation": occupation };
        const res = await fetch(backendURL, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        });
        console.log(res);
        setName('')
        setAge('')
        setOccupation('')
        getData();
    }

    return (
        <section className="bg-gray-100 max-w-screen-sm m-auto p-8 flex flex-col align-center justify-center rounded-md">
            <h1 className="mb-4 w-full text-4xl font-light text-center text-gray-800 uppercase sm-text-5xl">
                Survey Form
            </h1>
            <div className="flex flex-col w-full px-4 py-8 bg-white rounded-md shadow sm:px-6 md:px-8 lg:px-10">
                <div className="self-center text-xl font-light text-gray-600 sm:text-2xl">
                    Please fill out the form
                </div>
                <div className="mt-8">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-2">
                            <div className="flex flex-col mb-6">
                                <div className="flex">
                                    <input
                                        name={name}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                        className="rounded-r-lg flex-1 appearance-none border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 fucus:border-transparent"
                                        placeholder="Your Name"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <div className="flex">
                                    <input
                                        name={age}
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        type="number"
                                        className="rounded-r-lg flex-1 appearance-none border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 fucus:border-transparent"
                                        placeholder="Your Age"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <div className="flex">
                                    <input
                                        name={occupation}
                                        value={occupation}
                                        onChange={(e) => setOccupation(e.target.value)}
                                        type="text"
                                        className="rounded-r-lg flex-1 appearance-none border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 fucus:border-transparent"
                                        placeholder="Your Occupation"
                                    />
                                </div>
                            </div>
                            <div className="flex w-full">
                                <button type="submit" className="py-2 px-4 bg-gray-500 hover:bg-blue-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition-all duration-300">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="mt-4 bg-gray-200">
                <DataTable
                    value={suveryData}
                    tableStyle={{ minWidth: '15rem' }}
                >
                    <Column field="name" header="Name"></Column>
                    <Column field="age" header="Age"></Column>
                    <Column field="occupation" header="Occupation"></Column>
                </DataTable>
            </div>
        </section >
    )
}