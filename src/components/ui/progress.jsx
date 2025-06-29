"use client";

export function CookingProgress({ currentStep }) {
  const steps = ['Accepted', 'Cooking', 'Ready', 'Completed'];

  return (
    <div className="flex items-center justify-between my-4 px-8">
      {steps.map((step, index) => {
        const isCompleted = index <= currentStep;
        const showLine = index < steps.length - 1;

        return (
          <div key={step} className={`${showLine ? 'flex-1' : ''} flex items-center`}>
            <div className="flex flex-col items-center text-xs relative">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center z-10 ${
                  isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              />
              <span className={`mt-1 absolute top-[20px] ${isCompleted ? 'text-green-600' : 'text-gray-500'}`}>{step}</span>
            </div>
            {showLine && (
              <div className="flex-1 h-1 relative">
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-300">
                  <div
                    className={`h-1 rounded ${currentStep > index ? 'bg-green-500' : ''}`}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}