import { useNavigate, useSearchParams } from 'react-router-dom';

export const useCustomNavigate = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const customNavigate = (url: string) => {
        const groupID = searchParams.get('groupID');
        const token = searchParams.get('token');
        navigate(`/${url}?groupID=${groupID}&token=${token}`);
    };

    return customNavigate;
};