import { FaTelegram, FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="fixed bottom-0 w-full bg-main p-safe-or-2 z-50">
            <div className="flex space-x-4 p-2 w-full justify-center items-center">
                <a
                    href="https://www.t.me/akorchynskyi"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaTelegram className="text-white" size={24} />
                </a>
                <a
                    href="https://www.github.com/akorchyn"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub className="text-white" size={24} />
                </a>
                <a
                    href="https://www.linkedin.com/in/akorchyn/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaLinkedin className="text-white" size={24} />
                </a>
                <a
                    href="https://www.instagram.com/lsdgkljahgds/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaInstagram className="text-white" size={24} />
                </a>
                <a
                    href="https://twitter.com/theYurtur"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaTwitter className="text-white" size={24} />
                </a>
                <a
                    href="https://www.youtube.com/user/Wolf49xxx"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaYoutube className="text-white" size={24} />
                </a>
            </div>
            <div className="text-center text-white text-sm">
                <a
                    href="https://www.github.com/akorchyn/yurtur.top"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Source code
                </a>
            </div>
        </footer>
    );
}
