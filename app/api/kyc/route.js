// app/api/kyc/route.js
export async function GET() {
  // Sample data - replace with your actual data source
  const kycData = [
    { id: '1', userName: 'John Doe', idType: 'Passport', idNumber: 'A12345678', status: 'pending' },
    { id: '2', userName: 'Jane Smith', idType: 'Driver License', idNumber: 'DL87654321', status: 'pending' }
  ]
  return Response.json(kycData)
}
