import { useEffect, useState } from 'react'
import API from '../services/api'

const RiskList = () => {

  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [empty, setEmpty]     = useState(false)

  useEffect(() => {
    API.get('/risks')
      .then(res => {
        setReports(res.data)
        if(res.data.length === 0) setEmpty(true)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if(loading) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-500 text-lg">Loading...</p>
    </div>
  )

  if(empty) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-500 text-lg">No reports found!</p>
    </div>
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Risk Reports</h1>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left border">#</th>
            <th className="p-3 text-left border">Title</th>
            <th className="p-3 text-left border">Severity</th>
            <th className="p-3 text-left border">Status</th>
            <th className="p-3 text-left border">Location</th>
            <th className="p-3 text-left border">Reported By</th>
            <th className="p-3 text-left border">Date</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={report.id} className="hover:bg-gray-50">
              <td className="p-3 border">{index + 1}</td>
              <td className="p-3 border">{report.title}</td>
              <td className="p-3 border">
                <span className={`px-2 py-1 rounded text-white text-sm
                  ${report.severity === 'CRITICAL' ? 'bg-red-600' :
                    report.severity === 'HIGH'     ? 'bg-orange-500' :
                    report.severity === 'MEDIUM'   ? 'bg-yellow-500' :
                                                     'bg-green-500'}`}>
                  {report.severity}
                </span>
              </td>
              <td className="p-3 border">
                <span className={`px-2 py-1 rounded text-white text-sm
                  ${report.status === 'OPEN'      ? 'bg-blue-500' :
                    report.status === 'IN_REVIEW' ? 'bg-yellow-500' :
                                                    'bg-green-500'}`}>
                  {report.status}
                </span>
              </td>
              <td className="p-3 border">{report.location}</td>
              <td className="p-3 border">{report.reportedBy}</td>
              <td className="p-3 border">
                {new Date(report.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RiskList