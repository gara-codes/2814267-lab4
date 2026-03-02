async function fetchData() {
    try {
        const response = await fetch("");

    if(!response.ok){
        throw new Error("Could not fetch resource");
        
    }
    const data = response.json();

        
    } catch (error) {
        console.error(error);
    }

}