interface FetchProps {
  url: string
  params: Object
}

export const customFetch = async ({url, params}: FetchProps) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params)
    });
    
    if(response.status == 200) {
      const data = await response.json();
      return {
        success: true,
        data: data,
        imgUrl: data.imgUrl
      }
    }
    
    return {
      success: false,
      status: response.status
    }

  } catch(e) {
    return {
      success: false
    }
  }  
} 