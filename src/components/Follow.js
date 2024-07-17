import React from "react";
import './Follow.css'

const Follow = ({FollowerNumber, FollowingNumber}) => {
    return (
        <div className="follow-details">
            <div className="follow-info">
                <div className="FollowerNumber">
                    팔로워 <strong>{FollowerNumber}</strong>
                </div>
                <div className="FollowingNumber">
                    팔로잉 <strong>{FollowingNumber}</strong>
                </div>
        </div>
        <button className="follow-button">팔로우</button>
        </div>
    );
}

export default Follow;

 