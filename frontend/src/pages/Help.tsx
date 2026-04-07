import { HelpCircle } from "lucide-react";

export default function Help() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-zinc-900">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle size={32} className="text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-blue-100">Help & Support</h1>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-blue-200">Frequently Asked Questions</h2>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-blue-100">
            <li>How do I place an order?</li>
            <li>What payment methods are accepted?</li>
            <li>How can I track my order?</li>
            <li>How do I return or exchange a product?</li>
          </ul>
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-blue-200">Contact Us</h2>
          <p className="mb-2 text-gray-700 dark:text-blue-100">Email: support@miniecommerce.com</p>
          <p className="text-gray-700 dark:text-blue-100">Phone: +91-1234567890</p>
        </div>
      </div>
    </div>
  );
}
