import { COLORS } from '../colors.js'

export default function Header(name) {
  const header = document.createElement("div") ; 
  header.id = "header" ; 
  header.innerHTML  = `
<div>
  <p class = "headerTitle">StudyPal</p>
  <p class = "welcomeText">Hello there, ${name}</p>
</div>

`

  return header ; 
}
