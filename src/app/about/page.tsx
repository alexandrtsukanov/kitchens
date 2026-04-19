import { siteConfig } from "@/config";

const About = () => {
    return (
        <div>
            <p>{siteConfig.navbarItems.about.content}</p>
        </div>
    )
}

export default About;