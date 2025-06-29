// app/api/users/route.js
export async function GET() {
  // Sample data - replace with your actual data source
  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active', createdAt: '2023-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'active', createdAt: '2023-02-20' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'suspended', createdAt: '2023-03-10' }
  ]
  return Response.json(users)
}