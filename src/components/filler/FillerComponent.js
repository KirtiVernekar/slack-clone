import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { apps, bookmarks, channels, files, groups, mentions, threads, welcome } from '../../images/index'
import './FillerComponent.scss'

const FillerComponent = ({ welcomePage }) => {
    const { navlink } = useParams();

    const fillerPages = {
        threads: {
                    title: "Tend to your threads",
                    image: threads
                },
        'activity-page': {
                            title: "See new activity in real time",
                            image: mentions
                        },
        'saved-page': {
                        title: "Add messages and files to come back to later",
                        image: bookmarks
                    },
        'browse-channels': {
                                title: "Browse all channels here",
                                image: channels
                            },
        'browse-files': {
                            title: "Find all files here",
                            image: files
                        },
        'browse-people': {
                            title: "Find and connect with people",
                            image: groups
                        },
        apps: {
                title: "App directory",
                image: apps
            }
    }
    
    return (
        <div className="filler">
            { welcomePage
                ? (
                    <>
                        <h2>Welcome to Slack!</h2>
                        <img src={welcome} alt="welcome image"/>
                    </>
                ) : (
                    <>
                        <img src={fillerPages[navlink].image} alt={navlink}/>
                        <h2>{fillerPages[navlink].title}</h2>
                        <p>Coming soon!</p>
                    </>
                )}
        </div>
    )
}

export default FillerComponent
