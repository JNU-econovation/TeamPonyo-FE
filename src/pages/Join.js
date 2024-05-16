import React from 'react'
import { useParams } from 'react-router'

const Join = () => {

    const { joinId } = useParams();
    console.log(useParams());

  return (
    <div>
        Join {joinId} 입니다.
    </div>
  )
}

export default Join