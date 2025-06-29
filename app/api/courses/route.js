// app/api/courses/route.js

import { connectToDatabase } from '../../../lib/mongoose'
import Course from '../../../models/Course'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    await connectToDatabase()
    const courses = await Course.find({})
    return NextResponse.json(courses)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}

export async function POST(req) {
  try {
    await connectToDatabase()

    const { title, description, published } = await req.json()

    const newCourse = await Course.create({
      title,
      description,
      published,
    })

    return NextResponse.json({
      success: true,
      course: newCourse,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

