"use client";

import { Suspense } from "react";
import Link from "next/link";
import { handleCreateLink } from "@/app/actions/links-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProfilePageComponent() {
  return (
    <div className="flex  bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <nav className="p-5 space-y-2">
          <Link
            href="#"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
          >
            لوحة التحكم
          </Link>
          <Link
            href="#"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
          >
            تعديل الملف الشخصي
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Profile Dashboard</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Submit Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={handleCreateLink}>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  name="url-input"
                  placeholder="Enter something..."
                  className="flex-1"
                />
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Submission History</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading submissions...</div>}>
              {/* <SubmissionsTable /> */}
              <div>No submissions yet.</div>
            </Suspense>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

// TODO: create the get user data function and make it global to the application
// async function SubmissionsTable() {
//   const submissions = await fetch(`http://localhost:4000/api/users/`);
//   if (!submissions || submissions.length === 0) {
//     return <div>No submissions yet.</div>;
//   }

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>ID</TableHead>
//           <TableHead>Link</TableHead>
//           <TableHead>Data</TableHead>
//           <TableHead>Created At</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {submissions.map((submission) => (
//           <TableRow key={submission.id}>
//             <TableCell>{submission.id}</TableCell>
//             <TableCell>
//               <a
//                 href={submission.link}
//                 className="text-blue-500 hover:underline"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {submission.link}
//               </a>
//             </TableCell>
//             <TableCell>{submission.data}</TableCell>
//             <TableCell>
//               {new Date(submission.createdAt).toLocaleString()}
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }
