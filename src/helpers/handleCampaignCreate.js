import firebase from 'firebase'
export const handleCampaignCreate = (userId, campaignName) => {
  let campaignsRef = firebase.database().ref('campaigns')
  let userRef = firebase.database().ref('users/' + userId + '/campaigns')
  let campaignKey = campaignsRef.push().getKey()
  let campaignData = {
    name: campaignName,
    gm: userId
  }
  campaignsRef.child(campaignKey).set(campaignData)
  userRef.push({name: campaignName})
}
