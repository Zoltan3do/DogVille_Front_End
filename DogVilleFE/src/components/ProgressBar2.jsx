import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { executedogfetch } from "../redux/singleDogFetch";

/* eslint-disable react/prop-types */
function ProgressBar2({ value = 0, max = 3 }) {
    const dog = useSelector((state) => state.dogFetch?.value);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(executedogfetch(id));
        }
    }, [id, dispatch, dog])

    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
        <div className="mb-8">
            <div className="bg-reddino dark:bg-reddino relative h-4 w-full rounded-2xl">
                <div
                    className="bg-primary-color absolute top-0 left-0 flex h-full items-center justify-center rounded-2xl text-xs font-semibold text-whiteino transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                >
                    <p className="text-center w-full text-whiteino">{Math.round(percentage)}%</p>
                </div>
            </div>
        </div>
    );
}

export default ProgressBar2;
