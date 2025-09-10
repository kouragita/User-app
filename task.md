Build a small Next.js + TypeScript app that lists users from the a JSON mock data api and  allows simple interaction. 
Requirements 
1. Fetch & Display Users 
• Show users in a clean, responsive list with: 
• Name 
• Email 
• Company 
2. Search/Filter 
• Add a search bar to filter users by name (case-insensitive). 
3. Detail Page 
• Clicking on a user opens a detail page (/users/[id]) with: 
• Name, email, phone, website, company. 
4. Features (State Management) 
• On the list, each user should have a ‘favourite’ button. 
• Clicking it toggles “favorite” state (stored in a React state of your choice). • Add a “Show Favorites Only” toggle above the list. 
5. Error & Loading States 
• Show a loading spinner while fetching. 
• Show an error message if the fetch fails. 
• If search returns no users, display “No users found.” 
Use: 
TypeScript 
• Define types/interfaces for users. 
• Avoid using any. 
Bonus (if time allows) 
• Add a form (/add-user) to create a mock user (just store it in state). • Deploy on Vercel and share the link.
