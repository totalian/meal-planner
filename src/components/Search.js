import Input from "./Input" 

const Search = ({meals, setFilteredMeals}) => {

  const handleChange = e => {
    const searchTerm = e.target.value
    const filteredMeals = meals.filter(obj => obj.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredMeals(filteredMeals)
  }

  return (
    <div>
      <Input label="search" onChange={handleChange} />  
    </div>
  )
}

export default Search
