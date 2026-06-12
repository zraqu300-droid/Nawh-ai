/**
 * AdminUpload.jsx
 * Premium Admin Upload Page for nawh.ai
 *
 * THE MOST IMPORTANT PAGE FOR BUYERS
 *
 * Features:
 * - Drag and Drop file upload area
 * - Multiple file selection support
 * - Image preview functionality
 * - Progress indicators
 * - Form fields (Title, Description, Category, Data Type)
 * - File validation and size display
 * - Upload queue management
 * - RTL/LTR support
 *
 * @author nawh.ai
 * @version 1.0.0
 */

import { useState, useCallback, useRef } from 'react';
import {
  Upload,
  File,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  X,
  CheckCircle,
  AlertCircle,
  Trash2,
  Eye,
  Download,
  MoreVertical,
  Folder,
  Cloud,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { useLanguage } from '../../context/ThemeLanguageContext.jsx';
import { Card } from '../../components/Card.jsx';
import Input, { TextArea } from '../../components/Input.jsx';
import Button from '../../components/Button.jsx';

// ============================================
// File Type Icons Mapping
// ============================================
const getFileIcon = (type) => {
  if (type.startsWith('image/')) return Image;
  if (type.startsWith('video/')) return Video;
  if (type.startsWith('audio/')) return Music;
  if (type.includes('pdf') || type.includes('document')) return FileText;
  if (type.includes('zip') || type.includes('rar') || type.includes('archive')) return Archive;
  return File;
};

// ============================================
// File Size Formatter
// ============================================
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// ============================================
// File Item Component
// ============================================
function FileItem({ file, progress, status, onRemove, onPreview, language, isRTL }) {
  const Icon = getFileIcon(file.type);
  const statusColors = {
    pending: 'text-gray-400',
    uploading: 'text-blue-500',
    success: 'text-green-500',
    error: 'text-red-500',
  };

  return (
    <div
      className={`
        flex items-center gap-4 p-4 rounded-xl
        bg-gray-50 dark:bg-gray-800/50
        hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
        ${isRTL ? 'flex-row-reverse' : ''}
      `}
    >
      {/* File Icon / Preview */}
      <div className="relative flex-shrink-0">
        {file.type.startsWith('image/') && file.preview ? (
          <img
            src={file.preview}
            alt={file.name}
            className="w-14 h-14 rounded-xl object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <Icon className="w-7 h-7 text-gray-600 dark:text-gray-400" />
          </div>
        )}

        {/* Status Indicator */}
        {status === 'success' && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <CheckCircle className="w-3 h-3 text-white" />
          </div>
        )}
        {status === 'error' && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
            <AlertCircle className="w-3 h-3 text-white" />
          </div>
        )}
      </div>

      {/* File Info */}
      <div className={`flex-1 min-w-0 ${isRTL ? 'text-end' : 'text-start'}`}>
        <p className="font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
        <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>

        {/* Progress Bar */}
        {status === 'uploading' && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>{progress}%</span>
              <span>
                {language === 'ar' ? 'جاري الرفع...' : 'Uploading...'}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {status === 'success' && (
          <button
            onClick={onPreview}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-500" />
          </button>
        )}
        {status !== 'uploading' && (
          <button
            onClick={onRemove}
            className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        )}
        {status === 'uploading' && (
          <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
        )}
      </div>
    </div>
  );
}

// ============================================
// Category Option Component
// ============================================
function CategoryOption({ icon: Icon, label, value, selected, onClick, language }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`
        flex flex-col items-center gap-2 p-4 rounded-xl
        border-2 transition-all duration-200
        ${selected === value
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
        }
      `}
    >
      <div
        className={`
          w-12 h-12 rounded-xl flex items-center justify-center
          transition-colors duration-200
          ${selected === value
            ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
          }
        `}
      >
        <Icon className="w-6 h-6" />
      </div>
      <span
        className={`
          text-sm font-medium text-center
          ${selected === value
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-600 dark:text-gray-400'
          }
        `}
      >
        {label}
      </span>
    </button>
  );
}

// ============================================
// Main AdminUpload Component
// ============================================
function AdminUpload() {
  const { language, isRTL } = useLanguage();

  // State management
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadStatus, setUploadStatus] = useState({});

  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dataType, setDataType] = useState('');

  // Refs
  const fileInputRef = useRef(null);

  // ============================================
  // Drag and Drop Handlers
  // ============================================
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  }, []);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  // ============================================
  // File Management Functions
  // ============================================
  const addFiles = (newFiles) => {
    const filesWithPreview = newFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    }));

    setFiles((prev) => [...prev, ...filesWithPreview]);

    // Set status to pending for new files
    filesWithPreview.forEach((f) => {
      setUploadStatus((prev) => ({ ...prev, [f.id]: 'pending' }));
    });
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
    setUploadStatus((prev) => {
      const newStatus = { ...prev };
      delete newStatus[id];
      return newStatus;
    });
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[id];
      return newProgress;
    });
  };

  // ============================================
  // Simulated Upload Function
  // ============================================
  const simulateUpload = async (fileId) => {
    // Set status to uploading
    setUploadStatus((prev) => ({ ...prev, [fileId]: 'uploading' }));

    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setUploadProgress((prev) => ({ ...prev, [fileId]: i }));
    }

    // Simulate random success/failure (90% success rate)
    const success = Math.random() > 0.1;
    setUploadStatus((prev) => ({ ...prev, [fileId]: success ? 'success' : 'error' }));
  };

  const handleUploadAll = async () => {
    // Upload each file one by one
    for (const fileItem of files) {
      if (uploadStatus[fileItem.id] !== 'success') {
        await simulateUpload(fileItem.id);
      }
    }
  };

  // ============================================
  // Categories Configuration
  // ============================================
  const categories = [
    { icon: FileText, label: language === 'ar' ? 'مستندات' : 'Documents', value: 'documents' },
    { icon: Image, label: language === 'ar' ? 'صور' : 'Images', value: 'images' },
    { icon: Video, label: language === 'ar' ? 'فيديوهات' : 'Videos', value: 'videos' },
    { icon: Music, label: language === 'ar' ? 'صوتيات' : 'Audio', value: 'audio' },
    { icon: Archive, label: language === 'ar' ? 'أرشيف' : 'Archive', value: 'archive' },
    { icon: Folder, label: language === 'ar' ? 'آخرى' : 'Other', value: 'other' },
  ];

  // ============================================
  // Data Types Configuration
  // ============================================
  const dataTypes = [
    { label: language === 'ar' ? 'تدريب AI' : 'AI Training', value: 'ai_training' },
    { label: language === 'ar' ? 'تحليل بيانات' : 'Analytics', value: 'analytics' },
    { label: language === 'ar' ? 'محتوى تطبيقي' : 'App Content', value: 'app_content' },
    { label: language === 'ar' ? 'سجلات المستخدمين' : 'User Records', value: 'user_records' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* ============================================ */}
      {/* Page Header */}
      {/* ============================================ */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-end' : 'text-start'}>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {language === 'ar' ? 'رفع وإدارة البيانات' : 'Upload & Manage Data'}
          </h1>
          <p className="text-gray-500 mt-1">
            {language === 'ar'
              ? 'ارفع الملفات والبيانات لتحديث محتوى التطبيق'
              : 'Upload files and data to update app content'}
          </p>
        </div>

        {files.length > 0 && (
          <Button
            variant="gradient"
            size="lg"
            icon={<Cloud className="w-5 h-5" />}
            onClick={handleUploadAll}
          >
            {language === 'ar'
              ? `رفع الكل (${files.length})`
              : `Upload All (${files.length})`}
          </Button>
        )}
      </div>

      {/* ============================================ */}
      {/* Upload Area */}
      {/* ============================================ */}
      <Card padding="none" className="overflow-hidden">
        {/* Drop Zone */}
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`
            relative p-8 md:p-12 text-center
            transition-all duration-300
            ${isDragging
              ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed border-blue-500'
              : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
            }
          `}
        >
          {/* Animated Background */}
          {isDragging && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
            </div>
          )}

          {/* Content */}
          <div className="relative">
            {/* Upload Icon */}
            <div
              className={`
                w-20 h-20 mx-auto mb-6 rounded-2xl
                flex items-center justify-center
                transition-all duration-300
                ${isDragging
                  ? 'bg-gradient-to-br from-blue-500 to-purple-500 scale-110'
                  : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                }
              `}
            >
              <Upload
                className={`
                  w-10 h-10 transition-all duration-300
                  ${isDragging ? 'text-white' : 'text-gray-400'}
                `}
              />
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {isDragging
                ? language === 'ar'
                  ? 'افلت الملفات هنا'
                  : 'Drop files here'
                : language === 'ar'
                  ? 'اسحب وأفلت الملفات هنا'
                  : 'Drag and drop files here'}
            </h2>

            {/* Description */}
            <p className="text-gray-500 mb-6">
              {language === 'ar'
                ? 'أو انقر لاختيار الملفات من جهازك'
                : 'or click to browse from your device'}
            </p>

            {/* File Types */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {['PNG', 'JPG', 'PDF', 'MP4', 'ZIP'].map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400"
                >
                  {type}
                </span>
              ))}
            </div>

            {/* Browse Button */}
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="secondary"
              size="lg"
              icon={<Folder className="w-5 h-5" />}
            >
              {language === 'ar' ? 'تصفح الملفات' : 'Browse Files'}
            </Button>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,audio/*,.pdf,.zip,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Files List */}
        {files.length > 0 && (
          <div
            className={`
              p-6 border-t border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800
            `}
          >
            <div
              className={`
                flex items-center justify-between mb-4
                ${isRTL ? 'flex-row-reverse' : ''}
              `}
            >
              <h3 className="font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'الملفات المحددة' : 'Selected Files'}
                <span className="text-gray-500 font-normal mx-2">({files.length})</span>
              </h3>
              <button
                onClick={() => setFiles([])}
                className="text-sm text-red-500 hover:underline"
              >
                {language === 'ar' ? 'مسح الكل' : 'Clear All'}
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pe-2">
              {files.map((fileItem) => (
                <FileItem
                  key={fileItem.id}
                  file={fileItem}
                  progress={uploadProgress[fileItem.id] || 0}
                  status={uploadStatus[fileItem.id] || 'pending'}
                  onRemove={() => removeFile(fileItem.id)}
                  onPreview={() => window.open(fileItem.preview, '_blank')}
                  language={language}
                  isRTL={isRTL}
                />
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* ============================================ */}
      {/* Upload Details Form */}
      {/* ============================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Form Fields */}
        <div className="space-y-6">
          <Card padding="lg">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'تفاصيل الرفع' : 'Upload Details'}
            </h2>

            <div className="space-y-5">
              {/* Title Input */}
              <Input
                label={language === 'ar' ? 'العنوان' : 'Title'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  language === 'ar'
                    ? 'أدخل عنوان الملفات'
                    : 'Enter file title'
                }
                required
              />

              {/* Description */}
              <TextArea
                label={language === 'ar' ? 'الوصف' : 'Description'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  language === 'ar'
                    ? 'أدخل وصفاً تفصيلياً للملفات'
                    : 'Enter detailed description'
                }
                rows={4}
              />
            </div>
          </Card>

          {/* Data Type Selection */}
          <Card padding="lg">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {language === 'ar' ? 'نوع البيانات' : 'Data Type'}
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {dataTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setDataType(type.value)}
                  className={`
                    p-4 rounded-xl text-start transition-all duration-200
                    border-2
                    ${dataType === type.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }
                  `}
                >
                  <p
                    className={`
                      font-medium
                      ${dataType === type.value
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300'
                      }
                    `}
                  >
                    {type.label}
                  </p>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Category Selection */}
        <Card padding="lg">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            {language === 'ar' ? 'القسم' : 'Category'}
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {categories.map((cat) => (
              <CategoryOption
                key={cat.value}
                icon={cat.icon}
                label={cat.label}
                value={cat.value}
                selected={category}
                onClick={setCategory}
                language={language}
              />
            ))}
          </div>

          {/* Upload Instructions */}
          <div
            className={`
              mt-6 p-4 rounded-xl
              bg-blue-50 dark:bg-blue-900/20
              border border-blue-200 dark:border-blue-800
              ${isRTL ? 'text-end' : 'text-start'}
            `}
          >
            <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
              {language === 'ar' ? 'نصائح للرفع' : 'Upload Tips'}
            </h4>
            <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1 list-disc ps-5">
              {language === 'ar' ? (
                <>
                  <li>الحد الأقصى لحجم الملف: 100 ميجابايت</li>
                  <li>الصيغ المدعومة: PNG, JPG, PDF, MP4, ZIP</li>
                  <li>تأكد من صحة البيانات قبل الرفع</li>
                  <li>استخدم أسماء واضحة للملفات</li>
                </>
              ) : (
                <>
                  <li>Maximum file size: 100MB</li>
                  <li>Supported formats: PNG, JPG, PDF, MP4, ZIP</li>
                  <li>Verify data accuracy before uploading</li>
                  <li>Use clear file names for better organization</li>
                </>
              )}
            </ul>
          </div>

          {/* Submit Button (Mobile) */}
          <div className="mt-6 lg:hidden">
            <Button
              variant="gradient"
              size="lg"
              fullWidth
              icon={<Cloud className="w-5 h-5" />}
              onClick={handleUploadAll}
              disabled={files.length === 0}
            >
              {language === 'ar'
                ? 'رفع الملفات'
                : 'Upload Files'}
            </Button>
          </div>
        </Card>
      </div>

      {/* ============================================ */}
      {/* Recent Uploads */}
      {/* ============================================ */}
      <Card padding="lg">
        <div
          className={`
            flex items-center justify-between mb-6
            ${isRTL ? 'flex-row-reverse' : ''}
          `}
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {language === 'ar' ? 'الرفعات الأخيرة' : 'Recent Uploads'}
          </h2>
          <Button variant="ghost" size="sm" icon={<RefreshCw className="w-4 h-4" />}>
            {language === 'ar' ? 'تحديث' : 'Refresh'}
          </Button>
        </div>

        {/* Recent Uploads Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th
                  className={`
                    pb-4 text-start text-sm font-medium text-gray-500
                    ${isRTL ? 'text-end' : 'text-start'}
                  `}
                >
                  {language === 'ar' ? 'الملف' : 'File'}
                </th>
                <th
                  className={`
                    pb-4 text-sm font-medium text-gray-500
                    ${isRTL ? 'text-end' : 'text-start'}
                  `}
                >
                  {language === 'ar' ? 'الحجم' : 'Size'}
                </th>
                <th
                  className={`
                    pb-4 text-sm font-medium text-gray-500
                    ${isRTL ? 'text-end' : 'text-start'}
                  `}
                >
                  {language === 'ar' ? 'القسم' : 'Category'}
                </th>
                <th
                  className={`
                    pb-4 text-sm font-medium text-gray-500
                    ${isRTL ? 'text-end' : 'text-start'}
                  `}
                >
                  {language === 'ar' ? 'الحالة' : 'Status'}
                </th>
                <th
                  className={`
                    pb-4 text-sm font-medium text-gray-500
                    ${isRTL ? 'text-end' : 'text-start'}
                  `}
                >
                  {language === 'ar' ? 'التاريخ' : 'Date'}
                </th>
                <th className="pb-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {/* Sample Recent Uploads */}
              {[
                {
                  name: 'dataset_training.zip',
                  size: '45.2 MB',
                  category: language === 'ar' ? 'أرشيف' : 'Archive',
                  status: 'success',
                  date: language === 'ar' ? 'منذ ساعتين' : '2 hours ago',
                },
                {
                  name: 'banner_image.png',
                  size: '2.1 MB',
                  category: language === 'ar' ? 'صور' : 'Images',
                  status: 'success',
                  date: language === 'ar' ? 'منذ 5 ساعات' : '5 hours ago',
                },
                {
                  name: 'user_guide.pdf',
                  size: '1.4 MB',
                  category: language === 'ar' ? 'مستندات' : 'Documents',
                  status: 'success',
                  date: language === 'ar' ? 'أمس' : 'Yesterday',
                },
              ].map((item, index) => (
                <tr key={index}>
                  <td className={`py-4 ${isRTL ? 'text-end' : 'text-start'}`}>
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <File className="w-5 h-5 text-gray-500" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className={`py-4 text-gray-500 ${isRTL ? 'text-end' : 'text-start'}`}>
                    {item.size}
                  </td>
                  <td className={`py-4 text-gray-500 ${isRTL ? 'text-end' : 'text-start'}`}>
                    {item.category}
                  </td>
                  <td className={`py-4 ${isRTL ? 'text-end' : 'text-start'}`}>
                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${item.status === 'success'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                        }
                      `}
                    >
                      {item.status === 'success'
                        ? language === 'ar'
                          ? 'مكتمل'
                          : 'Complete'
                        : language === 'ar'
                          ? 'قيد المعالجة'
                          : 'Processing'}
                    </span>
                  </td>
                  <td className={`py-4 text-gray-500 ${isRTL ? 'text-end' : 'text-start'}`}>
                    {item.date}
                  </td>
                  <td className="py-4">
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default AdminUpload;
