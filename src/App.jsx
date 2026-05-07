

import { useQuery } from '@tanstack/react-query'

// Fetch all breeds

const fetchBreeds = async () => {

  // fake delay
  await new Promise((resolve) =>
    setTimeout(resolve, 3000)
  )

  const res = await fetch('https://dogapi.dog/api/v2/breeds')

  if (!res.ok) throw new Error('Failed to fetch')

  return res.json()
}


// Fetch one breed
const fetchBreedById = async (id) => {
  const res = await fetch(`https://dogapi.dog/api/v2/breeds/${id}`)

  if (!res.ok) throw new Error('Failed to fetch breed')

  return res.json()
}

// Fetch facts
const fetchFacts = async () => {
  const res = await fetch('https://dogapi.dog/api/v2/facts')

  if (!res.ok) throw new Error('Failed to fetch facts')

  return res.json()
}

// Fetch groups
const fetchGroups = async () => {
  const res = await fetch('https://dogapi.dog/api/v2/groups')

  if (!res.ok) throw new Error('Failed to fetch groups')

  return res.json()
}

function App() {

  // Breeds query
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['breeds'],
    queryFn: fetchBreeds
  })

  // Breed details query
  const { data: breedDetails } = useQuery({
    queryKey: ['breed', '1'],
    queryFn: () => fetchBreedById('1')
  })

  // Facts query
  const { data: facts } = useQuery({
    queryKey: ['facts'],
    queryFn: fetchFacts
  })

  // Groups query
  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: fetchGroups
  })

  if (isPending) return <p>Loading...</p>

  if (isError) return <p>Error: {error.message}</p>

  return (
    <div className="container">
  
      {/* Breed List */}
      <div className="section">
        <h1>Dog Breeds</h1>
  
        <ul>
          {data.data.map((breed) => (
            <li key={breed.id}>
              {breed.attributes.name}
            </li>
          ))}
        </ul>
      </div>
  
      {/* Breed Details */}
      {breedDetails && (
        <div className="section">
          <h2>Breed Details</h2>
  
          <h3>{breedDetails.data.attributes.name}</h3>
  
          <p>
            {breedDetails.data.attributes.description}
          </p>
        </div>
      )}
  
      {/* Dog Facts */}
      {facts && (
        <div className="section">
          <h2>Dog Facts</h2>
  
          {facts.data.map((fact) => (
            <p key={fact.id}>
              {fact.attributes.body}
            </p>
          ))}
        </div>
      )}
  
      {/* Dog Groups */}
      {groups && (
        <div className="section">
          <h2>Dog Groups</h2>
  
          {groups.data.map((group) => (
            <p key={group.id}>
              {group.attributes.name}
            </p>
          ))}
        </div>
      )}
  
    </div>
  )
}

export default App







