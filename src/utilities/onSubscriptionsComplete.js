export const onSubscriptionsComplete = function (subscriptions, complete) {
  return () => {
    const allComplete = subscriptions.filter((s) => !s.isComplete).length <= 0;
  
    if (allComplete) {
      return complete();
    }
  }
};
