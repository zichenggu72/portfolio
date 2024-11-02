import fs from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'app/data')

export function getAllExperiences() {
  const fullPath = path.join(postsDirectory, 'experience.json')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const posts = JSON.parse(fileContents)
  
  return posts
}

export function getExperienceById(id) {
  const posts = getAllExperiences()
  return posts.find(post => post.id === id)
}