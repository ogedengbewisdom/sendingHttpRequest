
export const fetchAvailablePlaceHandler = async () => {
    const response = await fetch("http://localhost:3000/places");
    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }
    const data = await response.json();

    return data.places;

}; 

export const fetchVisitedPlaceHandler = async () => {
    const response = await fetch("http://localhost:3000/user-places");
    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }
    const data = await response.json();

    return data.places;
}; 

export const visitedPlaces = async (places) => {

    const response = await fetch("http://localhost:3000/user-places", {
        method: "PUT",
        body: JSON.stringify({places}),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error("Failed add place to visit")
    }
    const data = await response.json();
    return data.message
};

