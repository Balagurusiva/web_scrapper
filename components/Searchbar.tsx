"use client"

import React, {useState, FormEvent}  from 'react'

const isValidAmazonProductURL = (url : string ) => {

        const parseURL = new URL(url)
        const isCreated = true
        const hostname = parseURL.hostname
        try {
            if(
             hostname.includes('amazon.com') ||
             hostname.endsWith('amazon') ||
             hostname.includes('amazon.')
        ){ 
            return true
        }
        } catch (error) {
            return false
        }

    return false
}

const Searchbar = () => {
    const [searchPrompt, setSearchPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit =(event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const isValidLink = isValidAmazonProductURL(searchPrompt)
        if(!isValidLink) return alert("Please provide a valid amazon link")

         try {
            setIsLoading(true)
         } catch (error) {
            console.log(error)
         }finally{
            setIsLoading(false)
         }
    }
  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
        <input 
         type="text"
         placeholder='Enter product link'
         className='searchbar-input' 
         onChange={(e) => setSearchPrompt(e.target.value)}
        />

        <button 
          type='submit' 
          className='searchbar-btn'
          disabled ={searchPrompt === ""}
        >
            {isLoading ? "Searching" : "Search"}</button>
    </form>
  )
}

export default Searchbar
