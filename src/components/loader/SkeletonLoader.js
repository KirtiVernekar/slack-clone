import React from 'react'
import './SkeletonLoader.scss'
  
function SkeletonLoader() {
    return (
      <section>
        <div className="messages">
            {Array(9)
              .fill()
              .map((index) => (
                <div key={index}>
                  <div className="grid">
                    <img className="avatar skeleton" src="" />
                    <div data-body>
                        <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-text"></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
      </section>
          
    )
  }
 
  
  export default SkeletonLoader
  
  