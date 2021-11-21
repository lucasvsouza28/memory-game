import * as SC from './styles';

type Props = {
    variant?: 'primary' | 'secondary';
}

export const Title = ({
    variant = 'primary',
}: Props) => {
    return (
        <SC.Container
            variant={variant}
            href="/"
        >
            memory            
        </SC.Container>
    )
}
