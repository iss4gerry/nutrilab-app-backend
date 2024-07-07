const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - dob.getFullYear()
    const monthDifference = today.getMonth() - dob.getMonth()
      
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
      age--
    }
    
    return age
  
  }
    
  function parseDateString(dateString) {
    const date = new Date(dateString)
    
    return date.getMonth(), date.getDate()
  } 
  
module.exports = { 
    calculateAge,
    parseDateString,
}