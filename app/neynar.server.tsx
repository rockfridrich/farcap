async function getFarcasterUserFromFrameAction(message:string) {
    let response = 
        await fetch('https://api.neynar.com/v2/farcaster/frame/validate', {
            method: 'POST',
            headers: {
              accept: 'application/json',
              api_key: `${process.env.NEYNAR_API_KEY}`,
              'content-type': 'application/json'
            },
            body: JSON.stringify({
                cast_reaction_context: true, 
                follow_context: false,
                message_bytes_in_hex: message
            })
        })
        .then(response => response.json())

    if (response.valid != true) {
        throw Error('Invalid frame')
    }

    return response.action.interactor;
}

export async function getFarcasterUserAddress(message: string) {
    
    let user = await getFarcasterUserFromFrameAction(message);
    let addresses: Array<string> = user.verifications

    if(addresses.length == 0) {
        throw Error('Please connect your address to Farcaster')
    }

    return addresses[0];
}
 