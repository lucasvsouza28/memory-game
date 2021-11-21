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
        >
            memory            
        </SC.Container>
    )
}
