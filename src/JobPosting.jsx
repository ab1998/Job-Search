import React from "react"

export default function JobPosting({ title, url,by,date }) {
    const format = new Date(date*1000).toLocaleString()
    return (
        <>
            <div className="post" role="listitems">
                <h2 className="post__title"><a href={url} className={url ? "" : "inactivelink"}>{title}</a></h2>
                <span>By - {by} - {format}</span>
            </div>
        </>
    )
}