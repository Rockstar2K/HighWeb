import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CTA = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32  dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to get started?
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Fill out the form and our team will get back to you within 24 hours.
          </p>
        </div>
        
        <div className="grid gap-10 md:grid-cols-2">
          {/* Form Column */}
          <div className="space-y-6">
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="first-name"
                  >
                    First name
                  </label>
                  <Input id="first-name" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <label 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="last-name"
                  >
                    Last name
                  </label>
                  <Input id="last-name" placeholder="Enter your last name" />
                </div>
              </div>
              <div className="space-y-2">
                <label 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Email
                </label>
                <Input id="email" placeholder="Enter your email" type="email" />
              </div>
              <div className="space-y-2">
                <label 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="message"
                >
                  Message
                </label>
                <Textarea 
                  className="min-h-[120px]" 
                  id="message" 
                  placeholder="Tell us about your project" 
                />
              </div>
              <Button className="w-full" type="submit">
                Send Message
              </Button>
            </form>
          </div>
          
          {/* Content Column */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Why choose us?</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our team of experts is dedicated to providing the best service possible. 
                We'll work with you to understand your needs and deliver a solution that 
                exceeds your expectations.
              </p>
              <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                <li className="flex items-center space-x-2">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>24/7 Customer Support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Fast Response Time</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Custom Solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;