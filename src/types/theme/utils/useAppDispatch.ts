import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store/reducers/rootReduser';

export const useAppDispatch = () => useDispatch<AppDispatch>();
