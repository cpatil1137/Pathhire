interface LogoProps {
    size?: 'small' | 'medium' | 'large' | 'xlarge';
}

const Logo = ({ size = 'medium' }: LogoProps) => {
    const sizeClasses = {
        small: 'h-10 w-10',
        medium: 'h-12 w-12',
        large: 'h-16 w-16',
        xlarge: 'h-24 w-24'
    };

    return (
        <img 
            src="/PathHire logo.png" 
            alt="PathHire Logo" 
            className={sizeClasses[size]}
        />
    );
};

export default Logo;
