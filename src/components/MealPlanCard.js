import { Link } from "react-router-dom";

const MealPlanCard = ({
  mealPlan,
}) => {
  return (
    <Link
      to={`meal-plan/${mealPlan.id}`}
    >
      <div className="border-2 py-2 pl-2">
        <h2 className="text-center">{mealPlan.title}</h2>
      </div>
    </Link>
  );
};

export default MealPlanCard;
