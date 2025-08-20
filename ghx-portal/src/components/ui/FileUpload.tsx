import React from 'react'
import { Upload, FileText, X } from 'lucide-react'

interface FileUploadProps {
  label: string
  name: string
  file: File | null
  onChange: (file: File | null) => void
  accept?: string
  maxSizeMB?: number
  required?: boolean
  className?: string
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  file,
  onChange,
  accept = '.pdf',
  maxSizeMB = 20,
  required = false,
  className = ''
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    
    if (selectedFile) {
      // Check file size
      if (selectedFile.size > maxSizeMB * 1024 * 1024) {
        alert(`File size must be less than ${maxSizeMB} MB`)
        return
      }
      
      // Check file type
      if (accept === '.pdf' && selectedFile.type !== 'application/pdf') {
        alert('Please upload a PDF file')
        return
      }
      
      onChange(selectedFile)
    }
  }

  const removeFile = () => {
    onChange(null)
  }

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {!file ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
          <input
            type="file"
            id={name}
            name={name}
            onChange={handleFileChange}
            accept={accept}
            className="hidden"
          />
          <label htmlFor={name} className="cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drag & drop a file or browse
            </p>
            <p className="text-sm text-gray-500">
              Max file size is {maxSizeMB} MB
            </p>
          </label>
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-primary-600" />
              <div>
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
