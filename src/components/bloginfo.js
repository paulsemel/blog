import React from "react"
import { SocialIcon } from 'react-social-icons'

const thumbStyle = {
    width: '100%',
    height: '100%',
    maxWidth: '300px',
    maxHeight: '300px',
}

class BlogInfo extends React.Component {
    render() {
        return (
            <>
                <a style={{ marginRight: '5px' }} href='https://jenkins.paulsemel.org/job/paul-blog/'><img src='https://jenkins.paulsemel.org/buildStatus/icon?job=paul-blog' /></a>
                <SocialIcon style={{ marginLeft: '5px' }} network="sharethis" url="https://github.com/paulsemel/blog" label="Source code" />
            </>
        )
    }
}

export default BlogInfo
