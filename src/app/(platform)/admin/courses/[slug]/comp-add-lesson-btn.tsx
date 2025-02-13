import { Button } from '@/components/ui/button'
import React from 'react'
import { addLessonAction } from './action-add-lesson'

export const AddLessonBtn = ({sectionId} : {sectionId : string}) => {
  return (
    <section>
        <form action={addLessonAction}>
            <input name='sectionId' value={sectionId} type='hidden' />
            <Button className="bg-greenPrimary hover:bg-greenHover text-black">Add Lesson</Button>
        </form>
    </section>
  )
}
