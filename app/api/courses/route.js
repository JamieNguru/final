// app/api/courses/route.js
export async function GET() {
  // Sample data - replace with your actual data source
  const courses = [
    { id: '1', title: 'Introduction to Web Development', description: 'Learn the basics of HTML, CSS and JavaScript', published: true },
    { id: '2', title: 'Advanced React Patterns', description: 'Deep dive into React hooks and context API', published: false },
    { id: '3', title: 'Node.js Backend Fundamentals', description: 'Building server-side applications with Node.js', published: true }
  ]
  return Response.json(courses)
}
