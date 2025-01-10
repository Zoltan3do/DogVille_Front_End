/* eslint-disable react/prop-types */
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLikefetch, removeLikefetch } from "../../redux/likeSlice";
import "./dogCard.css"
import { Link } from "react-router-dom";

export function DogCard({
  name,
  race,
  age,
  gender,
  dogSize,
  profileImage,
  description,
  insertionDate,
  like_count,
  id,
}) {
  const dispatch = useDispatch();

  const likesList = useSelector((state) => state.meFetch.value.likes);
  const [isLiked, setIsLiked] = useState(likesList.some(i => i.id === id));

  const [localLikeCount, setLocalLikeCount] = useState(like_count);

  const toggleLike = () => {
    if (isLiked) {
      dispatch(removeLikefetch(id));
      setLocalLikeCount(localLikeCount - 1);
    } else {
      dispatch(addLikefetch(id));
      setLocalLikeCount(localLikeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setIsLiked(likesList.some(i => i.id === id));
  }, [likesList, id]);

  return (

    <Card className="overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-gray-400 transition-all duration-300 h-5/6">
      <Link to={`/dog/${id}`}>
        <CardHeader floated={false} shadow={false} color="transparent" className="m-0 rounded-none h-1/3">
          <img src={profileImage} alt="ui/ux review check" className="m-0 rounded-none w-full flex items-center justify-center h-full object-cover aspect-square " />
        </CardHeader>
        <CardBody>
          <Typography variant="h4" color="gray" className="font-bold truncate">
            {name} - [{race}]
          </Typography>
          <Typography variant="lead" color="gray" className="mt-2 text-lg ">
            <p className="line-clamp-3"> {description}</p>
          </Typography>
          <Typography variant="lead" color="gray" className="mt-5 text-base font-semibold">
            Taglia: <span className="italic font-normal">{dogSize}</span>
          </Typography>
          <Typography variant="lead" color="gray" className="text-base font-semibold">
            Età: <span className="italic font-normal">{age} anni</span>
          </Typography>
          <Typography variant="lead" color="gray" className="text-base font-semibold">
            Genere: <span className="italic font-normal">{gender}</span>
          </Typography>
        </CardBody>
      </Link>
      <CardFooter className="flex items-center w-full bottom-0 absolute justify-between">
        <div className="flex items-center">
          <button onClick={toggleLike} className="flex items-center space-x-2">
            {isLiked ? (
              <SolidHeartIcon className="w-6 h-6 text-red-500" />
            ) : (
              <OutlineHeartIcon className="w-6 h-6 text-gray-500" />
            )}
            <Typography variant="small" color="gray" className="font-medium">
              {localLikeCount}
            </Typography>
          </button>
        </div>
        <Typography className="font-normal">{insertionDate}</Typography>
      </CardFooter>
    </Card>
  );
}
