import { useDispatch } from 'react-redux';
import type { AppDispatch } from '..';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;