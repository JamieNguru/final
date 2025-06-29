// app/api/courses/[id]/route.js
export async function PATCH(request, { params }) {
  const { id } = params
  const { action, title, description } = await request.json()

  try {
    // In a real app, you would update your database here
    console.log(`Updating course ${id} with:`, { action, title, description })
    
    return Response.json({ 
      success: true, 
      message: `Course ${action === 'update' ? 'updated' : action + 'ed'} successfully` 
    })
  } catch (error) {
    return Response.json(
      { success: false, message: `Course ${action} failed` },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  const { id } = params

  try {
    // In a real app, you would delete from your database here
    console.log(`Deleting course ${id}`)
    
    return Response.json({ success: true, message: 'Course deleted successfully' })
  } catch (error) {
    return Response.json(
      { success: false, message: 'Course deletion failed' },
      { status: 500 }
    )
  }
}