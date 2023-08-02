import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { customFetch } from '@/utils'

import Head from 'next/head'
import Logo from '@/components/Logo'
import Button from '@/components/Button'
import TextField from '@/components/TextField'
import ImageViewer from '@/components/ImageViewer'

import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const promptRef = useRef<HTMLInputElement>(null);
  const [imgUrl, setImgUrl] = useState<string>('/logo.png');
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    if(!promptRef.current) return;
    setLoading(true);
    const prompt = promptRef.current.value;
    const response = await customFetch({
      url: '/api/generate',
      params: {prompt: prompt}
    });

    if(response.success) {
      // setImgUrl(response.data.imgUrl);
    } else {
      toast.error("Hmm, something went wrong!");
    }
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Phantom AI</title>
        <meta name='description' content='Phantom AI Frontend Test' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Logo>Phantom</Logo>
        <ImageViewer url={imgUrl} loading={loading} />
        <TextField ref={promptRef} placeholder='Please input prompt to generate image'/>
        <Button disabled={loading} onClick={handleGenerate}>Generate</Button>
      </main>
      <ToastContainer />
    </>
  )
}
